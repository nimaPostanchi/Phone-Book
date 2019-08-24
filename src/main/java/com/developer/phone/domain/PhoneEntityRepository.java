package com.developer.phone.domain;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PhoneEntityRepository extends CrudRepository<PhoneEntity, Long> {
    List<PhoneEntity> findByLastName(String lastName);
}
