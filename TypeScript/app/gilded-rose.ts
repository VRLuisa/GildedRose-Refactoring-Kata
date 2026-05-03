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

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (this.isSulfuras(item)) {
        continue;
      }

      if (this.isAgedBrie(item)) {
        this.updateAgedBrieItem(item);
        continue;
      }

      if (this.isBackstagePass(item)) {
        this.updateBackstagePassItem(item);
        continue;
      }

      this.updateNormalItem(item);
    }

    return this.items;
  }

  private updateNormalItem(item: Item): void {
    this.decreaseQuality(item);
    this.decreaseSellIn(item);

    if (item.sellIn < 0) {
      this.decreaseQuality(item);
    }
  }

  private updateAgedBrieItem(item: Item): void {
    this.increaseQuality(item);
    this.decreaseSellIn(item);

    if (item.sellIn < 0) {
      this.increaseQuality(item);
    }
  }

  private updateBackstagePassItem(item: Item): void {
    this.increaseQuality(item);

    if (item.sellIn < 11) {
      this.increaseQuality(item);
    }

    if (item.sellIn < 6) {
      this.increaseQuality(item);
    }

    this.decreaseSellIn(item);

    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  private increaseQuality(item: Item): void {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }

  private decreaseQuality(item: Item): void {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }
  }

  private decreaseSellIn(item: Item): void {
    item.sellIn = item.sellIn - 1;
  }

  private isAgedBrie(item: Item): boolean {
    return item.name == AGED_BRIE;
  }

  private isSulfuras(item: Item): boolean {
    return item.name == SULFURAS;
  }

  private isBackstagePass(item: Item): boolean {
    return item.name == BACKSTAGE_PASSES;
  }
}