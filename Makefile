run: 
	yarn nx run deal-client:serve-deal-apis
	
clear: 
	rm -rf ./node_modules/.cache/nx && nx reset