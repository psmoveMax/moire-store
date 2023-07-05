<template>
    <ul class="catalog__pagination pagination">
        <li class="pagination__item">
            <a href="#" class="pagination__link pagination__link--arrow"
                :class="{ 'pagination__link--disabled': page === 1 }" @click.prevent="arrowPaginateLeft(paginate, page)"
                aria-label="Предыдущая страница">
                <svg width="8" height="14" fill="currentColor">
                    <use xlink:href="#icon-arrow-left"></use>
                </svg>
            </a>
        </li>
        <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
            <a href="#" class="pagination__link" :class="{ 'pagination__link--current': pageNumber === page }"
                @click.prevent="paginate(pageNumber)">
                {{ pageNumber }}
            </a>
        </li>

        <li class="pagination__item">
            <a href="#" class="pagination__link pagination__link--arrow"
                :class="{ 'pagination__link--disabled': page === pages }"
                @click.prevent="arrowPaginateRight(paginate, pages, page)" aria-label="Следующая страница">
                <svg width="8" height="14" fill="currentColor">
                    <use xlink:href="#icon-arrow-right"></use>
                </svg>
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['modelValue', 'count', 'perPage'],
    computed: {
        page() {
            return this.modelValue
        },
        pages() {
            return Math.ceil(this.count / this.perPage);
        }
    },
    methods: {
        paginate(page) {
            this.$emit('update:modelValue', page);
        },
        arrowPaginateLeft(paginate, page) {
            if (page != 1) {
                paginate(page - 1);
            }
        },
        arrowPaginateRight(paginate, pages, page) {
            if (page != pages) {
                paginate(page + 1);
            }
        },
    }
}
</script>