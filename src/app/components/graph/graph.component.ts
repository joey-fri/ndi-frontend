import { Component } from '@angular/core';
import * as Highcharts from 'highcharts'
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'eco-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})

export class GraphComponent {
  protected updateFlag: boolean = false;
  private values : Array<any> = []
  Highcharts: typeof Highcharts = Highcharts;
  highchartsOptions: Highcharts.Options = {
      chart: {
          type: 'line'
      },
      title: {
          text: " ",
          align: 'left'
      },
      xAxis: {
        categories: ['']
      },
      yAxis: {
          min: -30,
          title: {
              text: " "
          }
      },
      plotOptions: {
          series: {
              label: {
                  connectorAllowed: false
              },
              pointStart: 1
          }
      },
      series: [
        {
          name: "Question 0",
          data: []
        } as any
      ]
  }

  constructor(private translate: TranslateService) {
    this.handleUpdate()
  }

  setGraphMinValue(){
    // @ts-ignore
    this.highchartsOptions.yAxis.min = Math.min(...this.values) - 5
  }

  async changeText() {
    // @ts-ignore
    this.highchartsOptions.title.text = await this.translate.get('GRAPH.TITLE').toPromise()
    // @ts-ignore
    this.highchartsOptions.yAxis.title.text = await this.translate.get('GRAPH.YAXIS').toPromise()
    // @ts-ignore
    this.highchartsOptions.series[0].name = await this.translate.get('GRAPH.YAXIS').toPromise()

    const questionText = await this.translate.get('GRAPH.XAXIS.QUESTION').toPromise()
    for (let i = 1; i < 6; i++) {
      // @ts-ignore
      const text = questionText + " " + i
      // @ts-ignore
      this.highchartsOptions.xAxis.categories.push(text as any)
    }

    this.values = []
    const tempValues = []
    for (let i = 1; i < 6; i++) {
      if (i != 1) {
        const oldValue : number = tempValues[i - 2]
        const newValue : number = Math.floor(Math.random() * 100)
        tempValues.push(oldValue + newValue)
      } else {
        tempValues.push( Math.floor(Math.random() * 100))
      }
    }
    this.values = tempValues

    this.setGraphMinValue()

    // @ts-ignore
    this.highchartsOptions.series[0].data = this.values as any

    // @ts-ignore
    console.log(this.highchartsOptions)
  }
  handleUpdate(){
    this.changeText().then(() => {
      // @ts-ignore
      this.updateFlag = true;
    })
  }

}
