package com.controllers;

import com.models.CommandOutput;
import com.models.dto.ReceivedCommandVM;
import com.utils.JShellExecutor;
import com.services.JShellService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class JShellCommandController {
    @Autowired
    JShellService jShellService;

    @PostMapping(value = "/jshellCommand")
    public List<CommandOutput> command(@RequestBody ReceivedCommandVM command){
        JShellExecutor executor = jShellService.getJse("0"); //for now we statically create a jse in the service
        List<CommandOutput> output= executor.evaluateCommand(command.getCommand());
        return output;
    }
}