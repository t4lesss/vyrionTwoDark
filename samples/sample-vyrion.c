#include <stdbool.h>
#include <stddef.h>

#define DEFAULT_LIMIT 3

typedef struct Reference {
    const char *name;
    bool enabled;
} Reference;

/* Tipo de retorno, nome, parâmetro, ponteiro e membro têm papéis distintos. */
int count_enabled(const Reference *items, size_t length) {
    int count = 0;
    for (size_t index = 0; index < length; ++index) {
        if (items[index].enabled) {
            count += 1;
        }
    }
    return count;
}
