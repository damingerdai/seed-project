import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer,
  Input
} from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as go from 'gojs';

// This requires us to include
// 'node_modules/gojs/extensionsTS/*'
// in the 'includes' list of this project's tsconfig.json
import { GuidedDraggingTool } from 'gojs/extensionsTS/GuidedDraggingTool';

import { ApiService } from '../../../core/api/api.service';
import { DialogService } from './../dialog/dialog.service';
import { DataResponse } from '../../../modal/response';


const $ = go.GraphObject.make;

@Component({
  selector: 'app-gojs-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit, AfterViewInit {

  private diagram: go.Diagram = new go.Diagram();
  private model = new go.GraphLinksModel();

  @ViewChild('diagramDiv', { static: false })
  private diagramRef: ElementRef;

  labels: any[] = [];

  constructor(
    private api: ApiService,
    private renderer: Renderer,
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
  ) {
    this.diagram = new go.Diagram();
    this.diagram.initialContentAlignment = go.Spot.Center;
    this.diagram.allowDrop = true;
    this.diagram.undoManager.isEnabled = true;
    this.diagram.toolManager.draggingTool = new GuidedDraggingTool();
    this.diagram.grid.visible = true;
    this.diagram.nodeTemplate =
      $(go.Node, go.Panel.Vertical,
        {
          background: 'white',
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Panel,
          'Spot',
          {
            isClipping: true,
          },
          $(go.Picture,
            {
              margin: 10, width: 50, height: 50,
            },
            new go.Binding('source')),
        ),
        $(go.TextBlock, 'Default Text',
          {
            margin: 12,
            stroke: '#44CCFF',
            font: 'bold 16px sans-serif',
            portId: 'A', cursor: 'pointer',
            fromLinkable: true,
            toLinkable: true,
          },
          new go.Binding('text', 'name')),
      );
    // this.diagram.layout = $(go.TreeLayout, { angle: 90, layerSpacing: 35 });
    this.diagram.linkTemplate = $(go.Link,
      {
        routing: go.Link.Orthogonal,
        corner: 5,
        relinkableFrom: true,
        relinkableTo: true,
      },
      $(go.Shape, { strokeWidth: 2, stroke: '#00B050', }),
      $(go.Shape, { toArrow: 'Standard', stroke: '#00B050', })); // the link shape

    this.model.linkFromPortIdProperty = 'fromPort';
    this.model.linkToPortIdProperty = 'toPort';
    this.diagram.model = this.model;

    if (localStorage.getItem('gojs')) {
      this.diagram.model = go.Model.fromJson(localStorage.getItem('gojs'));
    }

    if (localStorage.getItem('gojsposition')) {
      this.diagram.position = go.Point.parse(localStorage.getItem('gojsposition'));
    }
  }

  add(key: number) {
    this.model.addNodeData(this.labels.find(value => value.key === key));
  }

  save() {
    this.dialogService.open({
      data: {
        title: '保存',
        content: '确定是否需要保存?'
      },
      hasBackdrop: true
    }).afterClosed().subscribe(result => {
      if (result) {
         localStorage.setItem('gojs', this.diagram.model.toJson());
         localStorage.setItem('gojsposition', go.Point.stringify(this.diagram.position));
        console.log(go.Point.stringify(this.diagram.position));
        console.log(this.diagram.model.modelData);
        console.log(this.diagram.model.toJson());
      }
    });
  }

  clear() {
    this.dialogService.open({
      data: {
        title: '清除',
        content: '一旦清除，将无法恢复'
      },
      hasBackdrop: true
    }).afterClosed().subscribe(result => {
      if (result) {
        this.model.nodeDataArray = [];
        this.model.linkDataArray = [];
        this.snackBar.open('清除成功', '关闭', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    });

  }

  selectionChange(event: MatSelectionListChange) {
    if (event.source.options.first.selected) {
      this.diagram.layout = $(go.TreeLayout, { angle: 90, layerSpacing: 35 });
    } else if (!event.source.options.first.selected) {
      this.diagram.layout = null;
    }
  }

  ngOnInit() {
    this.diagram.div = this.diagramRef.nativeElement;

    this.api.get<DataResponse<any[]>>('assets/flowTags.json')
      .subscribe(res => {
        if (res.statusCode === 200) {
          this.labels = res.data;
        }
      });
  }

  ngAfterViewInit(): void {
    // 主要是保证div和canvas保持重叠
    const child = (this.diagramRef.nativeElement as HTMLElement).children[0];
    // this.renderer.setElementStyle(child, 'left', '24px');
  }

}
