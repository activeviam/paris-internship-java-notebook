package com.services;

import com.utils.JShellExecutor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class JShellServiceImpl implements JShellService {

    private static Map<String, JShellExecutor> jShellRepo = new HashMap<>();

    static {
        //for now, since we are not spawning notebooks, we create one to work with
        JShellExecutor tempJse = new JShellExecutor();
        jShellRepo.put("0", tempJse);
    }

    //the id will be the session token, unique to each notebook
    @Override
    public void createJse(String id) {
        JShellExecutor jse = new JShellExecutor();
        jShellRepo.put(id, jse);
    }

    //returns the jse of the requested notebook, identified by session id
    @Override
    public JShellExecutor getJse(String id) {
        return jShellRepo.get(id);
    }
}