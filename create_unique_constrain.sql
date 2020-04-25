-- Create/Recreate primary, unique and foreign key constraints 
alter table AIRLINE
  add constraint ID_UNIQUE unique (ID)
  using index 
  tablespace XXXX
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 128K
    next 128K
    minextents 1
    maxextents unlimited
    pctincrease 0
  );
