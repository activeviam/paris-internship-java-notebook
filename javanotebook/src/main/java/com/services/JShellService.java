package com.services;

import com.utils.JShellExecutor;

public interface JShellService {

    public abstract void createJse(String id);
    public abstract JShellExecutor getJse(String id);
    
}