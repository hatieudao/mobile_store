ALTER TABLE cart ADD COLUMN address varchar(300);
ALTER TABLE cart ADD COLUMN phone varchar(20);
ALTER TABLE cart_details ADD COLUMN quantity integer;
ALTER TABLE comments ADD COLUMN parent_id integer;
