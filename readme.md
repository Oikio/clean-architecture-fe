State as stream or redux store.  
Actions are store updaters.  
Selectors are optional.

UseCases should contain only business logic.  
UseCases should be generators (need to write "do" library)  
Generators should (due to IOC) help with DI, effects and testing (see redux-saga)

Components use only useCases to update and streams to read.  
Local state is appreciated if it makes sense  
Components could be from any library, I will use React or Mithril, but it's an implementation detail

Gateways, services and utils represent everything else

TODO:  
write a todo...
