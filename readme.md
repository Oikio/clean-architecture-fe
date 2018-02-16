# Concept
FRP and view libraries are just implementation details.  

TODO: diagram of project structure.  

# To run app
```npm i ```  
```npm run dev```

# State
State as stream.   
StateUpdaters are dumb store updaters.  
StateUpdaters should work only with their own Cell.  
Selectors are optional, you might not need them because you just use streams which you need.  

# Dispatcher
Dispatcher is a stream of intents for useCases  
Dispacther provides dispatch method for intents  

# Intents
Intents are dispatching events to Dispatcher  
They are the only way to update useCases and can be used in top layer of application (in Components, Services, Router and etc)

# UseCases
UseCases are streams subscribed to Dispatcher
UseCases should contain just business logic.  
UseCases should know nothing about outer scope, but contracts.  
If you want to use libraries like validation, ajax and so on inside useCases, use, but treat them as contracts then.  


# Components
Components can only use intents to interact with outer scope.  
Outer knowledge should only come from state or computedState steams
Local state is appreciated especially if it's related to view.  
Components can be from any library, I will use React, but it's an implementation detail
Reusable components should be in components folder, routes in routes folder

Gateways, services and utils represent everything else.  

# TODO:  
Fix HMR for RxJS  
Decide about namings (stateUpdater, intent and useCase should be devided)  
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