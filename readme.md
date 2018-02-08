State as stream or redux store should be implementation detail.  
Actions are store updaters.  
Actions should work only with their own subject.
Selectors are optional.

UseCases should contain only business logic.  
UseCases should know nothing about outer scope.  
UseCases should be generators (need to write "do" library)  
Generators should (due to IOC) help with DI, effects and testing (see redux-saga)

Components use only useCases to update global state.  
Local state is appreciated if it makes sense.  
Components could be from any library, I will use React or Mithril, but it's an implementation detail

Gateways, services and utils represent everything else.  
? Should use useCases for communication.

NOTES:  
Types are mess right now

TODO:  
Think about cancellable useCases
Decide how dependant state streams should work
