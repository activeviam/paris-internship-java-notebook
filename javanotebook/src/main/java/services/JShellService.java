package services;

import utils.JShellExecutor;

public interface JShellService {

    public abstract void createJse(String id);
    public abstract JShellExecutor getJse(String id);
    
}