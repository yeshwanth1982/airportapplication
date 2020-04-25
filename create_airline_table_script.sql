-- Create table
create table AIRLINE
(
  id       INTEGER not null,
  name     VARCHAR2(100),
  alias    VARCHAR2(100),
  iata     CHAR(2),
  icao     CHAR(3),
  callsign VARCHAR2(100),
  country  VARCHAR2(100),
  active   CHAR(1)
)
tablespace XXXX
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 128K
    next 128K
    minextents 1
    maxextents unlimited
    pctincrease 0
  );