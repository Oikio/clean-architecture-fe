# State
State as stream.   
Actions are dumb store updaters.  
Actions should work only with their own subject.  
Selectors are optional, you might not need them because you just use streams that you need.  
Computed state should be in useCases, as long as it's part of business logic.
If you want to use redux, see redux-observable, it's very promising library.

# UseCases
UseCases mostly are streams, but you are not obliged decide on type of useCase.  
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
Important: See if pushing to Cells really the solution, maybe we can use some kind of flow?
Try to use just modules from react, recompose and rxjs to minify bundle, test build version and how long does it take to evaluate js onload  
Add proper logging tools
Add state, usCases and enhancers factories
Decide how dependant useCases should work with each other
Think about combined state streams without business logic  
Create a real simple app (form, filtering, complex state)  
Add hydration of state example  
Add time travel example  
Add computed state example  
Add tests, see how they should work with useCases  
Add cancelable useCases  
Create more complex app, maybe just develop a list of howtos.  