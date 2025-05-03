from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class Reservation(BaseModel):
    guest_name: str
    number_of_guests: int
    stay_type: str  # "Cabin" or "Day Trip"
    check_in: date
    check_out: date
    dietary_notes: Optional[str] = None
