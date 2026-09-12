from typing import Optional
from pydantic import BaseModel, EmailStr, field_validator


class InvoicePayload(BaseModel):
    frontend_stack: Optional[str] = None
    project_type: Optional[str] = None
    hosting_plan: Optional[str] = None
    domain_option: Optional[str] = None

    client_name: str
    client_company: Optional[str] = None
    client_email: EmailStr
    notes: Optional[str] = None

    payment_network: str
    tx_hash: str

    # Client-computed values, echoed back for logging/UX only — the
    # backend recomputes the authoritative total from catalog.py rather
    # than trusting these.
    build_total: Optional[float] = None
    hosting_monthly: Optional[float] = None

    @field_validator("tx_hash")
    @classmethod
    def tx_hash_not_blank(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError("tx_hash must not be blank")
        return v.strip()


class VerificationDetail(BaseModel):
    network: str
    exists: bool
    tx_successful: bool
    receiver_matches: bool
    amount_matches: bool
    verified: bool
    message: str


class OrderResponse(BaseModel):
    order_id: str
    status: str
    message: str
    expected_total: float
    verification: VerificationDetail
