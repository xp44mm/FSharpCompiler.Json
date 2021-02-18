value : object
	  | array
	  | NULL
	  | FALSE
	  | TRUE
	  | STRING
	  | NUMBER
	  ;

object : "{" fields "}"
       ;

array  : "[" values "]"
       ;

fields : fields "," field
	   | field
	   | /* empty */
	   ;

field : STRING ":" value
	  ;

values : values "," value
	   | value
	   | /* empty */
	   ;


