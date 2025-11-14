#include <stddef.h>
#include <stdint.h>
#include "compile_options.h"

typedef struct suite suite;
struct suite{
  uint8_t number;
  suite* parent;
  bool game_ended;
  bool is_min_max_def;
  bool min_max_val;
  bool is_processed;
  uint8_t number_of_children;
  suite* children_array_pointer[COMPILE_MAX_CHILDREN];
};

void main(){}
