package controllers;

import models.JShellCommand;
import models.dto.ReceivedCommandVM;
import utils.JShellExecutor;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class JShellCommandController{
    private final AtomicLong counter = new AtomicLong();
    @PostMapping(value = "/jshellCommand")
    public JShellCommand command(@RequestBody ReceivedCommandVM command){
        JShellExecutor executor = new JShellExecutor();
        List<String> commandOutput = executor.evaluate2(command.getCommand());
        return new JShellCommand(counter.incrementAndGet(), commandOutput, command.getCommand());
    }
}