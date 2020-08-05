CREATE TABLE listings (
  id SERIAL,
  listingid varchar(8),
  reviews int,
  price int,
);

CREATE TABLE reservations(
  id SERIAL,
  listingid varchar(8),
  date varchar(10),
  adult int,
  children int, 
  infant int,
);

ALTER TABLE listings ADD PRIMARY KEY (listingId);
ALTER TABLE reservations ADD CONSTRAINT fk_listingid_listings_reservations FOREIGN KEY (listingId) REFERENCES listings(listingId);
CREATE INDEX listings_listingid_idx ON listings (listingid);
CREATE INDEX reservations_listingid_idx ON reservations (listingid);