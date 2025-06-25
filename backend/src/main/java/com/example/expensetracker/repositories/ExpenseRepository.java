package com.example.expensetracker.repositories;


import com.example.expensetracker.models.Expense;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExpenseRepository extends MongoRepository<Expense, String> {

}
