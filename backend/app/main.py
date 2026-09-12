import uuid

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import models, schemas, catalog
from .database import engine, get_db
from .verification import verify_transaction

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Vertex Digital — Order API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # add your deployed frontend origin(s) here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def generate_order_id() -> str:
    return f"ORD-{uuid.uuid4().hex[:8].upper()}"


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.post("/api/verify-invoice", response_model=schemas.OrderResponse)
def verify_invoice(payload: schemas.InvoicePayload, db: Session = Depends(get_db)):
    # Recompute the authoritative total server-side rather than trusting
    # the client-supplied build_total.
    expected_total = catalog.compute_expected_total(
        payload.frontend_stack, payload.project_type, payload.domain_option
    )

    hosting = catalog.HOSTING_PLANS.get(payload.hosting_plan)
    hosting_monthly = hosting["price"] if hosting else 0.0

    if payload.payment_network not in catalog.PAYMENT_NETWORKS:
        raise HTTPException(status_code=400, detail="Unknown payment network.")

    result = verify_transaction(
        network_id=payload.payment_network,
        tx_hash=payload.tx_hash,
        expected_amount=expected_total,
    )

    status = "verified" if result["verified"] else "pending_review"

    order = models.Order(
        order_id=generate_order_id(),
        frontend_stack=payload.frontend_stack,
        project_type=payload.project_type,
        hosting_plan=payload.hosting_plan,
        domain_option=payload.domain_option,
        client_name=payload.client_name,
        client_company=payload.client_company,
        client_email=payload.client_email,
        notes=payload.notes,
        payment_network=payload.payment_network,
        tx_hash=payload.tx_hash,
        expected_total=expected_total,
        hosting_monthly=hosting_monthly,
        status=status,
        verification_detail=result["message"],
    )
    db.add(order)
    db.commit()
    db.refresh(order)

    response_message = (
        "Payment verified — a studio lead will confirm scope by email shortly."
        if result["verified"]
        else "We couldn't automatically verify that transaction yet. Your order "
        "is saved and our team will confirm it manually."
    )

    return schemas.OrderResponse(
        order_id=order.order_id,
        status=order.status,
        message=response_message,
        expected_total=expected_total,
        verification=schemas.VerificationDetail(
            network=payload.payment_network,
            exists=result["exists"],
            tx_successful=result["tx_successful"],
            receiver_matches=result["receiver_matches"],
            amount_matches=result["amount_matches"],
            verified=result["verified"],
            message=result["message"],
        ),
    )


@app.get("/api/orders/{order_id}", response_model=None)
def get_order(order_id: str, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.order_id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found.")
    return {
        "order_id": order.order_id,
        "status": order.status,
        "expected_total": order.expected_total,
        "hosting_monthly": order.hosting_monthly,
        "created_at": order.created_at,
        "verification_detail": order.verification_detail,
    }
