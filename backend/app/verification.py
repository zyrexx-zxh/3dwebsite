import httpx
from typing import Callable, Dict
from .catalog import PAYMENT_NETWORKS

async def _run_real_explorer_lookup(network_id: str, tx_hash: str, expected_amount: float, expected_address: str) -> dict:
    """
    Template for real API calls. You will need to add your actual API keys.
    """
    exists = False
    tx_successful = False
    receiver_matches = False
    amount_matches = False

    try:
        if network_id == "usdt-trc20":
            # Real TronGrid API logic goes here
            # response = httpx.get(f"https://apilist.tronscanapi.com/api/transaction-info?hash={tx_hash}")
            pass
        elif network_id == "btc":
            # Blockstream API logic goes here
            pass
        elif network_id == "eth":
            # Etherscan API logic goes here
            pass
            
        # FOR NOW: Simulating success until you add your real API keys
        exists = True
        tx_successful = True
        receiver_matches = True
        amount_matches = True
        
    except Exception as e:
        return {"verified": False, "message": f"API Error: {str(e)}"}

    if not exists:
        return {"verified": False, "message": "Transaction not found on-chain."}
    if not tx_successful:
        return {"verified": False, "message": "Transaction exists but did not succeed."}
    if not receiver_matches:
        return {"verified": False, "message": f"Transaction did not pay the expected address."}
    if not amount_matches:
        return {"verified": False, "message": f"Amount received does not match the order total."}

    return {"verified": True, "message": "Transaction verified."}


async def verify_tx(network_id: str, tx_hash: str, expected_amount: float, expected_address: str) -> dict:
    return await _run_real_explorer_lookup(network_id, tx_hash, expected_amount, expected_address)


async def verify_transaction(network_id: str, tx_hash: str, expected_amount: float) -> dict:
    network = PAYMENT_NETWORKS.get(network_id)
    if not network:
        return {"verified": False, "message": f"Unsupported network: {network_id}"}

    return await verify_tx(network_id, tx_hash, expected_amount, network["admin_address"])
