export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const AGED_BRIE = 'Aged Brie';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';

type ItemUpdaterConstructor = new (item: Item) => ItemUpdater;

abstract class ItemUpdater {
  protected item: Item;

  constructor(item: Item) {
    this.item = item;
  }

  abstract update(): void;

  protected decreaseSellIn(): void {
    this.item.sellIn = this.item.sellIn - 1;
  }

  protected increaseQuality(amount: number): void {
    if (this.item.quality < 50) {
      this.item.quality = Math.min(50, this.item.quality + amount);
    }
  }

  protected decreaseQuality(amount: number): void {
    if (this.item.quality > 0) {
      this.item.quality = Math.max(0, this.item.quality - amount);
    }
  }
}

class NormalItemUpdater extends ItemUpdater {
  update(): void {
    this.decreaseSellIn();

    const degradation = this.item.sellIn < 0 ? 2 : 1;

    this.decreaseQuality(degradation);
  }
}

class AgedBrieUpdater extends ItemUpdater {
  update(): void {
    this.decreaseSellIn();

    const improvement = this.item.sellIn < 0 ? 2 : 1;

    this.increaseQuality(improvement);
  }
}

class SulfurasUpdater extends ItemUpdater {
  update(): void {
    // Sulfuras nunca cambia.
  }
}

class BackstagePassUpdater extends ItemUpdater {
  update(): void {
    this.decreaseSellIn();

    if (this.item.sellIn < 0) {
      this.item.quality = 0;
      return;
    }

    if (this.item.sellIn < 5) {
      this.increaseQuality(3);
      return;
    }

    if (this.item.sellIn < 10) {
      this.increaseQuality(2);
      return;
    }

    this.increaseQuality(1);
  }
}

class UpdaterFactory {
  private static readonly registry: { [key: string]: ItemUpdaterConstructor } = {
    [AGED_BRIE]: AgedBrieUpdater,
    [SULFURAS]: SulfurasUpdater,
    [BACKSTAGE_PASSES]: BackstagePassUpdater,
  };

  static forItem(item: Item): ItemUpdater {
    const Updater = UpdaterFactory.registry[item.name] || NormalItemUpdater;

    return new Updater(item);
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      UpdaterFactory.forItem(this.items[i]).update();
    }

    return this.items;
  }
}