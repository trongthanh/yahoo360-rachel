#!/usr/bin/perl
# From: http://plasmasturm.org/log/416/
# This script will fix mixed characters between utf-8 and iso-8859-1 and output text to stdout as utf-8.
# To convert a text file, execute: $ cat blog.txt | perl fix-mixed-encoding.pl > fixed-blog.txt
use strict;
use warnings;

use Encode qw( decode FB_QUIET );

binmode STDIN, ':bytes';
binmode STDOUT, ':encoding(UTF-8)';

my $out;

while ( <> ) {
  $out = '';
  while ( length ) {
    # consume input string up to the first UTF-8 decode error
    $out .= decode( "utf-8", $_, FB_QUIET );
    # consume one character; all octets are valid Latin-1
    $out .= decode( "iso-8859-1", substr( $_, 0, 1 ), FB_QUIET ) if length;
  }
  print $out;
}
