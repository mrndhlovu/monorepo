run: 
	yarn nx run deal-client:serve-client-apis 
	
clear: 
	rm -rf ./node_modules/.cache/nx && nx reset
	
zookeeper: 
	docker run -p 2181:2181 zookeeper
	
kafka:
	docker run -p 9092:9092 --env-file=.kafka.env confluentinc/cp-kafka