use candid::Principal;
use ic_cdk::{api::msg_caller, query};

#[query(guard = "ensure_authenticated")]
fn greet(name: String) -> String {
    format!("Hello, {name}!")
}

/// Ensures that the caller is authenticated (not anonymous).
pub fn ensure_authenticated() -> Result<(), String> {
    if msg_caller() == Principal::anonymous() {
        Err("Anonymous principal not allowed to make calls.".into())
    } else {
        Ok(())
    }
}
