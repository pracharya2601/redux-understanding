console.clear();

// people dripping off a form
const createPolicy = (name, amount) => {
  return { //action (a form of analogy)
    type: 'CREATE_POLICY',
    payload: {
      name: name,
      amount: amount
    }
  }
}

const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name: name
    }
  }
}

const createClaim = (name, amountToCollect) => {
  return {
    type:'CREATE_CLAIM',
    payload: {
      name: name,
      amountToCollect: amountToCollect
    }
  }
}



// Reducers(Department)

const claimHistory = (oldListClaim = [], action) => {
  if(action.type === 'CREATE_CLAIM') { // care about the action
    // get all the claim in new array and add another element
    return [...oldListClaim, action.payload];
  }
  return oldListClaim;
};


const accounting = (currentMoney = 100, action) => {
  if(action.type === 'CREATE_CLAIM') {
    return currentMoney - action.payload.amountToCollect;
  } else if (action.type === 'CREATE_POLICY') {
    return currentMoney + action.payload.amount
  }
  
  return currentMoney
}

const policies = (listOfPolicies = [], action) => {
  if(action.type === 'CREATE_POLICY') {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === 'DELETE_POLICY') {
     return listOfPolicies.filter(name => name!== action.payload.name);
  }
  return listOfPolicies;
};


// 
const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
  accounting: accounting,
  claimHistory: claimHistory,
  policies: policies,
});

const store = createStore(ourDepartments);

// different case actions
store.dispatch(createPolicy('Jimmy', 50 ));
store.dispatch(createPolicy('Josh', 20 ));
store.dispatch(createPolicy('Xan', 40 ));

store.dispatch(createClaim('Prakash', 20 ));
store.dispatch(createClaim('Chandra', 80 ));
store.dispatch(createClaim('Divya', 30 ));

store.dispatch(deletePolicy('Josh'));

console.log(store.getState())
