package com.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.utils.JShellExecutor;

@Service
public class JShellServiceImpl implements JShellService {

    private static Map<String, JShellExecutor> jShellRepo = new HashMap<>();

    static {
        // TODO: for now, since we are not spawning notebooks, we create one to work with
        JShellExecutor tempJse = new JShellExecutor();
        jShellRepo.put("0", tempJse);
    }

    @Override
    public void createJse(String id) {
        final JShellExecutor jse = new JShellExecutor();
        jShellRepo.put(id, jse);
    }

    @Override
    public JShellExecutor getJse(String id) {
        return jShellRepo.get(id);
    }
}