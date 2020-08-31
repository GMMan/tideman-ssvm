use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use array2d::Array2D;

#[derive(Serialize, Deserialize, Debug)]
struct Candidate {
  name: String
}

#[derive(Serialize, Deserialize, Debug)]
struct Ballot {
  committed: bool,
  order: Vec<usize>
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

#[derive(Debug)]
struct Pair {
  winner: usize,
  loser: usize,
  diff: u32
}

fn check_cycle(locked: &Array2D<bool>, visits: &mut Vec<bool>, curr: usize) -> bool {
  if visits[curr] {
    return true;
  }  
  visits[curr] = true;

  for i in 0..visits.len() {
    if locked[(curr, i)] && check_cycle(locked, visits, i) {
      return true;
    }
  }

  false
}

#[wasm_bindgen]
pub fn find_winner(params: &str) -> String {
  let deserialized_params: TidemanParams = serde_json::from_str(&params).unwrap();

  let num_candidates = deserialized_params.candidates.len();

  // Update preferences by counting the ballots
  let mut preferences = Array2D::filled_with(0u32, num_candidates, num_candidates);
  for ballot in deserialized_params.ballots.iter() {
    for i in 0..num_candidates-1 {
      for j in i+1..num_candidates {
        preferences[(ballot.order[i], ballot.order[j])] += 1;
      }
    }
  }

  // Record pairs of candidates where one is preferred over the other
  let mut pairs = Vec::new();
  for i in 0..num_candidates-1 {
    for j in i+1..num_candidates {
      if preferences[(i, j)] > preferences[(j, i)] {
        pairs.push(Pair {
          winner: i, loser: j, diff: preferences[(i, j)] - preferences[(j, i)]
        });
      } else if preferences[(i, j)] < preferences[(j, i)] {
        pairs.push(Pair {
          winner: j, loser: i, diff: preferences[(i, j)] - preferences[(j, i)]
        });
      }
    }
  }

  // Sort pairs in decreasing order by strength of victory
  pairs.sort_by(|a, b| b.diff.cmp(&a.diff));

  // Lock pairs into the candidate graph in order, without creating cycles
  let mut locked = Array2D::filled_with(false, num_candidates, num_candidates);
  for pair in pairs.iter() {
    let mut visits = vec![false; num_candidates];
    locked[(pair.winner, pair.loser)] = true;
    if check_cycle(&locked, &mut visits, pair.winner) {
      locked[(pair.winner, pair.loser)] = false;
    }
  }

  // Return the winner of the election
  let mut counts = vec![0; num_candidates];
  for i in 0..num_candidates {
    for j in 0..num_candidates {
      if locked[(i, j)] {
        counts[j] += 1
      }
    }
  }

  let mut winner = "No winner?".to_string();
  for (i, count) in counts.iter().enumerate() {
    if *count == 0 {
      winner = deserialized_params.candidates[i].name.clone();
      break;
    }
  }

  let result = TidemanResponse { winner: winner.to_string() };
  serde_json::to_string(&result).unwrap()
}
