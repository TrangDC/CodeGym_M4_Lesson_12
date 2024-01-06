package com.example.phonemanagementajaxwebservice.service;

import com.example.phonemanagementajaxwebservice.model.Smartphone;

import java.util.Optional;

public interface ISmartphoneService {

    Iterable<Smartphone> findAll();

    Optional<Smartphone> findSmartphoneById(Long id);

    Smartphone save(Smartphone smartphone);

    void remove(Long id);

}
