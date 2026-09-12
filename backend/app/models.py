from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.sql import func

from .database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(String, unique=True, index=True, nullable=False)

    frontend_stack = Column(String, nullable=True)
    project_type = Column(String, nullable=True)
    hosting_plan = Column(String, nullable=True)
    domain_option = Column(String, nullable=True)

    client_name = Column(String, nullable=False)
    client_company = Column(String, nullable=True)
    client_email = Column(String, nullable=False)
    notes = Column(Text, nullable=True)

    payment_network = Column(String, nullable=True)
    tx_hash = Column(String, nullable=True)

    expected_total = Column(Float, nullable=False, default=0.0)
    hosting_monthly = Column(Float, nullable=True, default=0.0)

    # pending_verification | verified | failed_verification
    status = Column(String, nullable=False, default="pending_verification")
    verification_detail = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
