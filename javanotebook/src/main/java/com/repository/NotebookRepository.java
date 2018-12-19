package com.repository;

import org.springframework.data.repository.CrudRepository;

import com.models.Notebook;

public interface NotebookRepository extends CrudRepository<Notebook, Long> {

}
