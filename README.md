BACKEND

- Install postgresql 

- add `DATABASE_URL=postgres://postgres:123456789@localhost:5432/postgres` to server/.env file

  postgres:123456789 => DB name:password


table: 
```bash
CREATE TABLE cards (
    card_id SERIAL PRIMARY KEY,
    card_number VARCHAR(255) NOT NULL,
    amount INTEGER NOT NULL
)
```

run backend
```bash
cd server
node server.js
```


    
