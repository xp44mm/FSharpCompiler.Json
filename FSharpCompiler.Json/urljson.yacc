value : object
	  | array
	  | NULL
	  | FALSE
	  | TRUE
	  | STRING
	  | NUMBER
	  ;

object : "(" fields ")"
       | EMPTY_OBJECT
       ;

fields : fields "!" field
	   | field
	   ;

field : name "*" value
	  ;

name : ID
     | KEY
	 ;

array : "(" values ")"
      ;

values : values "!" value
	   | value
	   | /* empty */
	     ;