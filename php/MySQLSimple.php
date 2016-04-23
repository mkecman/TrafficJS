<?php

class MySQLSimple
{
	var $db;
	var $affected_rows;
	
	var $error = "";
	var $errno = 0;
	var $query_id = 0;
	
	function __construct() 
	{
		/*
		$host = "127.0.0.1";
		$user = "root";
		$pass = "";
		$database = "flower";
		/**/
		$host = "localhost";
		$user = "markokec_flower";
		$pass = "Ayahuasca2016";
		$database = "markokec_flower";
		/**/
		$this->db = new mysqli( "p:" . $host, $user, $pass, $database); // p: is for creating persistent connection
		//$this->db = new mysqli( $host, $user, $pass, $database );
		if ($this->db->connect_error) 
		{
			die('Connect Error (' . $this->db->connect_errno . ') ' . $this->db->connect_error);
		}
	}

	function close() 
	{
		$this->db->close();
	}
	
	function escape($string) 
	{
		return $this->db->escape_string($string);
	}
	
	function query($sql) 
	{
		$result = $this->db->query($sql);
		if ($result) 
		{
			$this->affected_rows = $this->db->affected_rows;
			return $result;
		} 
		else 
			die("<b>MySQL Query fail:</b> $sql" );
		
		return null;
	}
	
	function fetch_all_array($sql) 
	{
		$result = $this->db->query($sql);
		if ( $result )
		{
			if ( method_exists( 'mysqli_result', 'fetch_all' ) ) # if mysqlnd is used
				return $result->fetch_all( MYSQLI_ASSOC );
			else
			{
				for ( $res = array(); $tmp = $result->fetch_array( MYSQLI_ASSOC ); ) 
					$res[] = $tmp;

				return $res;
			}
		}
		else
			return array();
	}

	function fetch_one_row($sql)
	{
		$row = $this->db->query($sql)->fetch_row();
		return $row;
	}
	
	function fetch_one_value($sql) 
	{
		$row = $this->db->query($sql)->fetch_row();
		return $row[0];
	}
	
	function query_insert($table, $data) 
	{
		$q = "INSERT INTO `" . $table . "` ";
		$v = '';
		$n = '';
		
		
		foreach ($data as $key => $val) 
		{
			$n.= "`$key`, ";
			if (strtolower($val) == 'null') $v.= "NULL, ";
			elseif (strtolower($val) == 'now()') $v.= "NOW(), ";
			else $v.= "'" . $this->escape($val) . "', ";
		}
		
		$q.= "(" . rtrim($n, ', ') . ") VALUES (" . rtrim($v, ', ') . ");";
		
		if ($this->db->query($q)) 
			return true;
		else 
			return false;
	}
	
	function query_update($table, $data, $where = '1') 
	{
		$q = "UPDATE `" . $table . "` SET ";
		
		foreach ($data as $key => $val) 
		{
			if (strtolower($val) == 'null') $q.= "`$key` = NULL, ";
			elseif (strtolower($val) == 'now()') $q.= "`$key` = NOW(), ";
			else $q.= "`$key`='" . $this->escape($val) . "', ";
		}
		
		$q = rtrim($q, ', ') . ' WHERE ' . $where . ';';
		
		return $this->db->query($q);
	}

	function query_delete($table, $where) 
	{
		$q = 'DELETE FROM `' . $table . '` WHERE ' . $where . ';';
		
		if ($this->db->query($q)) 
			return true;
		else 
			return false;
	}
}
?>