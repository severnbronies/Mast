class ListView {
    constructor(template) {
        this.template = null;
        this.storage = [];
        this.$container = null;
        this.template = template;
    }

    setContainer(container) {
        this.$container = container;
        if(this._hasView()) { this._renderAll(); }
    }

    clearContainer() {
        this.$container = null;
        this.$container.empty();
    }

    push(item) {
        this.storage.push(item);
        if(this._hasView()) {
            this.$container.append(this._renderItem(item));
        }
    }

    unshift(item) {
        this.storage.unshift(item);
        if(this._hasView()) {
            this.$container.prepend(this._renderItem(item));
        }
    }

    update(index, item) {
        this.storage[index] = item;
        if(this._hasView()) {
            this._childAtIndex(index).replaceWith(this._renderItem(item));
        }
    }

    updateAll(items) {
        this.storage = items;
        if(this._hasView()) {
            this.$container.children().remove();
            this._renderAll();
        }
    }

    pop() {
        if(this._hasView()) {
            this.$container.children(":last").remove();
        }
        return this.storage.pop();
    }

    shift() {
        if(this._hasView()) {
            this.$container.children(":first").remove();
        }
        return this.storage.shift();
    }

    at(index) {
        return this.storage[index];
    }

    get length() {
        return this.storage.length;
    }

    _hasView() {
        return this.$container !== null && this.template !== null;
    }

    _renderAll() {
        this.storage.forEach((item) => {
            this.$container.append(this._renderItem(item));
        });
    }

    _renderItem(item) {
        return nunjucks.render(this.template, item);
    }

    _childAtIndex(index) {
        return this.$container.children().eq(index);
    }
}
