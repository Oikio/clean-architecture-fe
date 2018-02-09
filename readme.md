# State
State as stream.   
Actions are dumb store updaters.  
Actions should work only with their own subject.  
Selectors are optional, you might not need them because you just use streams that you need.  
Computed state should be in useCases, as long as it's part of business logic.
If you want to use redux, see redux-observable, it's very promising library.

# UseCases
UseCases are streams.  
UseCases should contain just business logic.  
UseCases always return streams.  
UseCases should know nothing about outer scope, but contracts.  
If you want to use libraries like validation, ajax and so on inside useCases, use, but treat them as contracts then.  

# Components
Components can only use useCases to interact with outer scope.  
Outer knowledge should only come from state streams or useCases (e.g. if it's computed state).  
Local state is appreciated especially if it's related to view.  
Components could be from any library, I will use React or Mithril, but it's an implementation detail

Gateways, services and utils represent everything else.  

# NOTES:  
Types are mess right now

# TODO:  
Think about cancellable useCases  
Add tests, see how it works with useCases  
Create more complicated app (Todo? Tweets?)  
