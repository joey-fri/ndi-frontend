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
        categories: [''],
        labels: {
          style:{
            fontSize: '1.25rem'
          }
        }
      },
      legend: {
          itemStyle: {
              fontSize: '1rem'
          }
      },
      yAxis: {
          min: -30,
          title: {
              text: " ",
              style:{
                fontSize: '1.25rem'
              }
          },
          labels: {
              style:{
                fontSize: '1rem'
              }
          }
      },
      plotOptions: {
          series: {
              label: {
                  connectorAllowed: false
              },
              pointStart: 1,
              marker: {
                enabled: true,
                radius: 5,
              }
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

  async changeText() {
    // @ts-ignore
    await this.setGraphTextI18n().then( () => {
      this.setGraphValues()
      this.setGraphMinValue()
    })

    // @ts-ignore
    console.log(this.highchartsOptions)
  }
  handleUpdate(){
    this.changeText().then(() => {
      // @ts-ignore
      this.updateFlag = true;
      console.log("Final value: " + this.getFinalValue())
    })
  }

  getFinalValue() : number{
    return this.values[4]
  }
  async setGraphTextI18n() : Promise<void> {
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
  }
  setGraphMinValue() : void {
    // @ts-ignore
    this.highchartsOptions.yAxis.min = Math.min(...this.values) - 1
  }
  setGraphValues() : void {

    this.values = []
    const tempValues: any[] = []
    for (let i = 1; i < 6; i++) {
      let newValue : number | null = null
      let newValueString : string | null = localStorage.getItem("Question_" + i)
      if (newValueString == null) {
        newValue = null
      } else {
        newValue = Number(localStorage.getItem("Question_" + i))
      }
      console.log("New value: " + newValue + " for i = " + i)
      if (newValue != null) {
        if (i != 1) {
          const oldValue: number | null = tempValues[i - 2]
          // @ts-ignore
          tempValues.push(oldValue + newValue)
        } else {
          tempValues.push(newValue)
        }
      }
      this.values = tempValues
      console.log(this.values)
      // @ts-ignore
      this.highchartsOptions.series[0].data = this.values as any
    }
  }
}
