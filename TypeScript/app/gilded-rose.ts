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
      if (this.items[i].name == AGED_BRIE) {
        this.updateAgedBrieItem(this.items[i]);
        continue;
      }

      if (this.items[i].name == BACKSTAGE_PASSES) {
        this.updateBackstagePassItem(this.items[i]);
        continue;
      }

      if (
        this.items[i].name != AGED_BRIE &&
        this.items[i].name != BACKSTAGE_PASSES
      ) {
        this.updateNormalItem(this.items[i]);
      }

      if (!this.isSulfuras(this.items[i])) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != AGED_BRIE) {
          if (this.items[i].name != BACKSTAGE_PASSES) {
            this.updateNormalItem(this.items[i]);
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }

  private updateNormalItem(item: Item): void {
    if (item.quality > 0) {
      if (!this.isSulfuras(item)) {
        item.quality = item.quality - 1;
      }
    }
  }

  private updateAgedBrieItem(item: Item): void {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }
  }

  private updateBackstagePassItem(item: Item): void {
    if (item.quality < 50) {
      item.quality = item.quality + 1;

      if (item.sellIn < 11) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }

      if (item.sellIn < 6) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      item.quality = item.quality - item.quality;
    }
  }

  private isSulfuras(item: Item): boolean {
    return item.name == SULFURAS;
  }
}