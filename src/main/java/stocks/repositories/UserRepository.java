package stocks.repositories;

import org.springframework.data.repository.CrudRepository;

import stocks.models.User;

public interface UserRepository extends CrudRepository<User,String>{

}
