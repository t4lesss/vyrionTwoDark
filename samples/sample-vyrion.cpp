#include <string>
#include <vector>

namespace preview {

constexpr int default_limit = 3;

struct Reference {
    std::string name;
    bool enabled = true;
};

// Compare template, tipo, nome, parâmetro, referência e propriedade.
template <typename Item>
int count_enabled(const std::vector<Item>& items) {
    int count = 0;
    for (const auto& item : items) {
        if (item.enabled) {
            ++count;
        }
    }
    return count;
}

}  // namespace preview
