package com.repository;

import org.springframework.data.repository.CrudRepository;

import com.models.CodeSnippet;

public interface CodeSnippetRepository extends CrudRepository<CodeSnippet, Long> {

}
