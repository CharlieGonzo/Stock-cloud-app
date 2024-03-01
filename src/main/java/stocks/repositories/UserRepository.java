package stocks.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import stocks.models.User;

@Repository
public interface UserRepository extends MongoRepository<User,String>{
	
	public User findByUsername(String username);
	
	public void deleteByUsername(String username);

}
