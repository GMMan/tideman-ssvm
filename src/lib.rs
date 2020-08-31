use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
struct Candidate {
  name: String
}

#[derive(Serialize, Deserialize, Debug)]
struct Ballot {
  committed: bool,
  order: Vec<u32>
}

#[derive(Serialize, Deserialize, Debug)]
struct TidemanParams {
  candidates: Vec<Candidate>,
  ballots: Vec<Ballot>
}

#[derive(Serialize, Deserialize, Debug)]
struct TidemanResponse {
  winner: String
}


#[wasm_bindgen]
pub fn find_winner(params: &str) -> String {
  let deserialized_params: TidemanParams = serde_json::from_str(&params).unwrap();

  

  let result = TidemanResponse { winner: "John Doe".to_string() };
  serde_json::to_string(&result).unwrap()
}
