create or replace procedure PROC_ADD_DATA(p_airlineid IN integer,
                            p_name in VARCHAR2,
                            p_alias in VARCHAR2,
                            p_iata in CHAR,
                            p_icao in CHAR,
                            p_callsign in VARCHAR2,
                            p_country in VARCHAR2,
                            p_active in CHAR,
                            p_return out integer)is

is_available integer;

begin

is_available := 0;

select a.id into is_available from airline a
where a.id = p_airlineid;

if (is_available = 0) then

INSERT INTO AIRLINE
             (
               ID,
               NAME,
               ALIAS,
               IATA,
               ICAO,
               CALLSIGN,
               COUNTRY,
               ACTIVE)
      VALUES
             (
               p_airlineid,
               p_name,
               p_alias,
               p_iata,
               p_icao,
               p_callsign,
               p_country,
               p_active);

      COMMIT;
else

   UPDATE airline a SET
          a.name =  p_name,
          a.alias = p_alias,
          a.iata = p_iata,
          a.icao = p_icao,
          a.callsign = p_callsign,
          a.country = p_country,
          a.active = p_active
   WHERE a.id = p_airlineid;

end if;

p_return:=1;
return;

end PROC_ADD_DATA;
/
