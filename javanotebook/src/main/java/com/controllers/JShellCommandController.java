package com.controllers;

import com.models.CommandOutput;
import com.models.dto.ReceivedCommandVM;
import com.utils.JShellExecutor;
import com.services.JShellService;


import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class JShellCommandController {
    @Autowired
    JShellService jShellService;

    @PostMapping(value = "/api/jshellCommand")
    public List<CommandOutput> command(@RequestBody ReceivedCommandVM command){
        // TODO : for now we statically create a jse in the service
        final JShellExecutor executor = jShellService.getJse("0");
        final List<CommandOutput> output= executor.evaluateCommand(command.getCommand());
        return output;
    }

    @GetMapping(value="/api/codeAutoCompletion/{id}/{code}/{cursor}")
    public Set<String> autoComplete(@PathVariable("id") String id, @PathVariable("code") String code, @PathVariable("cursor") long cursor){
        final JShellExecutor jse = jShellService.getJse(id);
        final Set<String> autoCompletion = jse.codeAutoCompletion(code, (int)cursor);
        return autoCompletion;
    }
}