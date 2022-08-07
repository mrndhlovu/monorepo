run: 
	yarn nx run deal-client:serve-client-apis 
	
clear: 
	rm -rf ./node_modules/.cache/nx && nx reset
	
zookeeper: 
	docker run --name zookeeper -p 2181:2181 zookeeper
	
kafka:
	docker run --name kafka -p 9092:9092 --env-file=.kafka.env confluentinc/cp-kafka

ui: 
	docker run -p 8080:8080 -env-file=.kafka.env provectuslabs/kafka-ui:latest