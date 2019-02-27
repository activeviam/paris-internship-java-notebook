package com.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.utils.JShellExecutor;

@Service
public class JShellServiceImpl implements JShellService {

    private static Map<Long, JShellExecutor> jShellRepo = new HashMap<>();

    static {
        // TODO: for now, since we are not spawning notebooks, we create one to work with
        JShellExecutor tempJse = new JShellExecutor();
        jShellRepo.put((long)-1, tempJse);
    }

    @Override
    public void createJse(long id) {
        final JShellExecutor jse = new JShellExecutor();
        jShellRepo.put(id, jse);
    }

    @Override
    public JShellExecutor getJse(long id) {
        if (!jShellRepo.containsKey(id)){
            this.createJse(id);
        }
        return jShellRepo.get(id);
    }

    @Override
    public JShellExecutor getDefaultJSE(){
        return jShellRepo.get((long)-1);
    }

    @Override
    public void restartJse(long id){
        final JShellExecutor jse = new JShellExecutor();
        jShellRepo.put(id, jse);
    }
}