import { Component, OnInit, DoCheck, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';
import * as joint from 'jointjs/dist/joint';

import { ApiService } from '../../../core/api/api.service';
import { LabelGroup, LabelItem } from '../../../modal/label';
import { DataResponse } from '../../../modal/response';


@Component({
  selector: 'app-jointjs-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit, DoCheck, AfterViewInit {

  @ViewChild('myholder')
  private myholder: ElementRef;

  graph = new joint.dia.Graph;
  paper: joint.dia.Paper;
  cells: Array<joint.shapes.basic.Rect | joint.dia.Link> = [];
  labels: LabelGroup[] = [];

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar) { }

  addCell(group: string, label: string) {
    const id = this.buildCellId(group, label);
    if (!this.graph.getCell(id)) {
      const rect = new joint.shapes.standard.Rectangle();
      rect.position(100, 30);
      rect.resize(100, 40);
      rect.set('id', id);
      rect.attr({
        body: {
          fill: '#8E44AD',
          rx: 20,
          ry: 20,
          strokeWidth: 0
        },
        label: {
          text: label,
          fill: 'white'
        }
      });
      const cells = this.graph.getCells().filter(value => !(value instanceof joint.shapes.standard.Link));
      cells.forEach(value => console.log(value instanceof joint.shapes.standard.Link));
      if (cells.length > 0) {
        const lastRect = cells[cells.length - 1];
        console.log(lastRect.id);
        const link = new joint.shapes.standard.Link();
        link.source(lastRect);
        link.target(rect);
        rect.addTo(this.graph);
        link.addTo(this.graph);
      } else {
        rect.addTo(this.graph);
      }
    } else {
      this.snackBar.open('该标签已经添加引用', '关闭', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  }

  clear(): void {
    this.graph.clear();
  }

  ngOnInit() {
    this.api.get<DataResponse<LabelGroup[]>>('assets/label.json')
      .subscribe(res => {
        if (res.statusCode === 200) {
          this.labels = res.data;
        }
      });
  }

  ngDoCheck(): void {
    // console.log('ngDoCheck');
    // this.initPaper();

  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.initPaper();
  }

  private initPaper() {
    if (this.myholder && !this.paper) {
      this.paper = new joint.dia.Paper({
        el: this.myholder.nativeElement,
        width: 1200,
        height: 500,
        model: this.graph,
        gridSize: 10,
        drawGrid: true,
        background: {
          color: 'rgba(0, 255, 0, 0.3)'
        }
      });
      // this.initCells();
    }

    // if (document.getElementById('myholder') && !this.paper) {
    //   this.paper = new joint.dia.Paper({
    //     el: document.getElementById('myholder'),
    //     width: 1200,
    //     height: 500,
    //     model: this.graph,
    //     gridSize: 10,
    //     drawGrid: true,
    //     background: {
    //       color: 'rgba(0, 255, 0, 0.3)'
    //     }
    //   });
    //   // this.initCells();
    // }
  }

  private initCells() {
    const rect = new joint.shapes.standard.Rectangle();
    rect.position(100, 30);
    rect.resize(100, 40);
    rect.attr({
      body: {
        fill: 'blue',
      },
      label: {
        text: 'Hello',
        fill: 'white'
      }
    });
    rect.addTo(this.graph);

    const rect2 = new joint.shapes.standard.Rectangle();
    rect2.position(400, 30);
    rect2.resize(100, 40);
    rect2.attr({
      body: {
        fill: '#2C3E50',
        rx: 5,
        ry: 5,
        strokeWidth: 2
      },
      label: {
        text: 'World!',
        fill: '#3498DB',
        fontSize: 18,
        fontWeight: 'bold',
        fontVariant: 'small-caps'
      }
    });
    rect2.addTo(this.graph);

    const link = new joint.shapes.standard.Link();
    link.source(rect);
    link.target(rect2);
    link.addTo(this.graph);

    const rect3 = new joint.shapes.standard.Rectangle();
    rect3.position(100, 130);
    rect3.resize(100, 40);
    rect3.attr({
      body: {
        fill: '#E74C3C',
        rx: 20,
        ry: 20,
        strokeWidth: 0
      },
      label: {
        text: 'Hello',
        fill: '#ECF0F1',
        fontSize: 11,
        fontVariant: 'small-caps'
      }
    });
    rect3.addTo(this.graph);

    const rect4 = new joint.shapes.standard.Rectangle();
    rect4.position(400, 130);
    rect4.resize(100, 40);
    rect4.attr({
      body: {
        fill: '#8E44AD',
        strokeWidth: 0
      },
      label: {
        text: 'World!',
        fill: 'white',
        fontSize: 13
      }
    });
    rect4.addTo(this.graph);

    const link2 = new joint.shapes.standard.Link();
    link2.source(rect3);
    link2.target(rect4);
    link2.addTo(this.graph);

    const rect5 = new joint.shapes.standard.Rectangle();
    rect5.position(100, 230);
    rect5.resize(100, 40);
    rect5.attr({
      body: {
        fill: '#2ECC71',
        strokeDasharray: '10,2'
      },
      label: {
        text: 'Hello',
        fill: 'black',
        fontSize: 13
      }
    });
    rect5.addTo(this.graph);

    const rect6 = new joint.shapes.standard.Rectangle();
    rect6.position(400, 230);
    rect6.resize(100, 40);
    rect6.attr({
      body: {
        fill: '#F39C12',
        rx: 20,
        ry: 20,
        strokeDasharray: '1,1'
      },
      label: {
        text: 'World!',
        fill: 'gray',
        fontSize: 18,
        fontWeight: 'bold',
        fontVariant: 'small-caps',
        textShadow: '1px 1px 1px black'
      }
    });
    rect6.addTo(this.graph);

    const link3 = new joint.shapes.standard.Link();
    link3.source(rect5);
    link3.target(rect6);
    link3.addTo(this.graph);

  }

  private buildCellId(group: string, label: string): string {
    return group + '-' + label;
  }


}
