package com.maxgen.petshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.maxgen.petshop.entity.ContectMsg;

@Repository
public interface ContectMsgRepository extends JpaRepository<ContectMsg, Long>{

}
